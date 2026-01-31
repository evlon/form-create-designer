<template>
    <div class="fc-audio-box" :style="containerStyle">
        <div class="audio-header" v-if="title && showHeader">
            <div class="audio-title">{{ title }}</div>
        </div>
        
        <div class="audio-content" :class="{ 'audio-placeholder': !src }">
            <div v-if="src" class="audio-player">
                <div class="album-art" v-if="showAlbumArt && artwork">
                    <img :src="artwork" :alt="title" />
                </div>
                <div class="player-info">
                    <div class="track-name">{{ trackName || t('com.audioBox.unknownTrack') }}</div>
                    <div class="artist-name" v-if="artist">{{ artist }}</div>
                </div>
                
                <div class="progress-section">
                    <el-slider
                        :model-value="progressValue"
                        :max="100"
                        :step="0.1"
                        :show-tooltip="false"
                        @change="seekTo"
                    />
                    <div class="time-info">
                        <span>{{ formatTime(currentTime) }}</span>
                        <span>{{ formatTime(duration) }}</span>
                    </div>
                </div>
                
                <div class="controls-row">
                    <el-button size="small" text @click="skipPrevious">
                        <el-icon><DArrowLeft /></el-icon>
                    </el-button>
                    <el-button size="small" text circle type="primary" @click="togglePlay" class="play-btn">
                        <el-icon size="24">
                            <VideoPause v-if="isPlaying" />
                            <VideoPlay v-else />
                        </el-icon>
                    </el-button>
                    <el-button size="small" text @click="skipNext">
                        <el-icon><DArrowRight /></el-icon>
                    </el-button>
                </div>
                
                <div class="volume-section">
                    <el-icon @click="toggleMute">
                        <VideoCamera v-if="!isMuted && volume > 0" />
                        <Mute v-else />
                    </el-icon>
                    <el-slider
                        v-model="volume"
                        :max="1"
                        :step="0.1"
                        style="flex: 1"
                        @change="onVolumeChange"
                    />
                </div>
                
                <div class="rate-section" v-if="showRateControl">
                    <el-select v-model="playbackRate" size="small" @change="onRateChange">
                        <el-option label="0.5x" :value="0.5" />
                        <el-option label="0.75x" :value="0.75" />
                        <el-option label="1x" :value="1" />
                        <el-option label="1.25x" :value="1.25" />
                        <el-option label="1.5x" :value="1.5" />
                        <el-option label="2x" :value="2" />
                    </el-select>
                </div>
            </div>
            
            <div v-else class="audio-empty">
                <el-empty :description="t('com.audioBox.noAudio')">
                    <template v-if="!disabled">
                        <el-button type="primary" @click="selectAudio">
                            <el-icon><Headset /></el-icon>
                            {{ t('com.audioBox.selectAudio') }}
                        </el-button>
                    </template>
                </el-empty>
            </div>
        </div>
        
        <audio
            ref="audioRef"
            :src="src"
            preload="auto"
            @play="onPlay"
            @pause="onPause"
            @ended="onEnded"
            @timeupdate="onTimeUpdate"
            @loadedmetadata="onLoadedMetadata"
            @error="onError"
        />
        
        <input
            type="file"
            ref="fileInputRef"
            accept="audio/*"
            style="display: none"
            @change="onFileChange"
        />
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { VideoPlay, VideoPause, VideoCamera, DArrowLeft, DArrowRight, Mute, Headset } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'AudioBox',
    components: {
        VideoPlay,
        VideoPause,
        VideoCamera,
        DArrowLeft,
        DArrowRight,
        Mute,
        Headset
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'update:src', 'change', 'play', 'pause', 'ended', 'timeupdate', 'error'],
    props: {
        modelValue: {
            type: [String, Object],
            default: ''
        },
        src: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        trackName: {
            type: String,
            default: ''
        },
        artist: {
            type: String,
            default: ''
        },
        artwork: {
            type: String,
            default: ''
        },
        width: {
            type: [Number, String],
            default: '100%'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        loop: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        showAlbumArt: {
            type: Boolean,
            default: true
        },
        showRateControl: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, expose }) {
        const audioRef = ref(null);
        const fileInputRef = ref(null);
        const isPlaying = ref(false);
        const currentTime = ref(0);
        const duration = ref(0);
        const volume = ref(0.8);
        const isMuted = ref(false);
        const playbackRate = ref(1);
        const progressValue = ref(0);
        
        const containerStyle = computed(() => {
            const style = {};
            if (typeof props.width === 'number') {
                style.width = props.width + 'px';
            } else {
                style.width = props.width;
            }
            return style;
        });
        
        const formatTime = (seconds) => {
            if (!seconds || isNaN(seconds)) return '00:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        };
        
        const selectAudio = () => {
            fileInputRef.value?.click();
        };
        
        const onFileChange = (event) => {
            const file = event.target.files?.[0];
            if (file) {
                const url = URL.createObjectURL(file);
                emit('update:modelValue', { url, file, name: file.name });
                emit('update:src', url);
                emit('change', { url, file, name: file.name });
            }
        };
        
        const togglePlay = () => {
            if (!audioRef.value) return;
            if (isPlaying.value) {
                audioRef.value.pause();
            } else {
                audioRef.value.play();
            }
        };
        
        const skipPrevious = () => {
            if (!audioRef.value) return;
            audioRef.value.currentTime = Math.max(0, audioRef.value.currentTime - 10);
        };
        
        const skipNext = () => {
            if (!audioRef.value) return;
            audioRef.value.currentTime = Math.min(duration.value, audioRef.value.currentTime + 10);
        };
        
        const toggleMute = () => {
            if (!audioRef.value) return;
            isMuted.value = !isMuted.value;
            audioRef.value.muted = isMuted.value;
        };
        
        const seekTo = (value) => {
            if (!audioRef.value || !duration.value) return;
            audioRef.value.currentTime = (value / 100) * duration.value;
        };
        
        const onVolumeChange = (value) => {
            if (!audioRef.value) return;
            audioRef.value.volume = value;
            isMuted.value = value === 0;
        };
        
        const onRateChange = (rate) => {
            if (!audioRef.value) return;
            audioRef.value.playbackRate = rate;
        };
        
        const onPlay = () => {
            isPlaying.value = true;
            emit('play');
        };
        
        const onPause = () => {
            isPlaying.value = false;
            emit('pause');
        };
        
        const onEnded = () => {
            isPlaying.value = false;
            if (props.loop) {
                audioRef.value.currentTime = 0;
                audioRef.value.play();
            } else {
                emit('ended');
            }
        };
        
        const onTimeUpdate = () => {
            if (audioRef.value) {
                currentTime.value = audioRef.value.currentTime;
                progressValue.value = duration.value 
                    ? (currentTime.value / duration.value) * 100 
                    : 0;
            }
            emit('timeupdate', { currentTime: currentTime.value });
        };
        
        const onLoadedMetadata = () => {
            if (audioRef.value) {
                duration.value = audioRef.value.duration;
            }
        };
        
        const onError = (event) => {
            emit('error', event);
        };
        
        const play = () => audioRef.value?.play();
        const pause = () => audioRef.value?.pause();
        
        expose({ play, pause, audioRef });
        
        watch(() => props.src, (newSrc) => {
            if (newSrc && audioRef.value) {
                audioRef.value.load();
                if (props.autoplay) {
                    play();
                }
            }
        });
        
        return {
            t,
            audioRef,
            fileInputRef,
            containerStyle,
            isPlaying,
            currentTime,
            duration,
            volume,
            isMuted,
            playbackRate,
            progressValue,
            formatTime,
            selectAudio,
            onFileChange,
            togglePlay,
            skipPrevious,
            skipNext,
            toggleMute,
            seekTo,
            onVolumeChange,
            onRateChange,
            onPlay,
            onPause,
            onEnded,
            onTimeUpdate,
            onLoadedMetadata,
            onError
        };
    }
});
</script>

<style>
.fc-audio-box {
    width: 100%;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow: hidden;
}

.audio-header {
    padding: 12px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
}

.audio-title {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}

.audio-content {
    padding: 24px;
}

.audio-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.album-art {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.album-art img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.player-info {
    text-align: center;
}

.track-name {
    font-size: 16px;
    font-weight: 600;
    color: #303133;
}

.artist-name {
    font-size: 13px;
    color: #909399;
    margin-top: 4px;
}

.progress-section {
    width: 100%;
    max-width: 400px;
}

.time-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #909399;
    margin-top: 4px;
}

.controls-row {
    display: flex;
    align-items: center;
    gap: 16px;
}

.play-btn {
    width: 56px !important;
    height: 56px !important;
}

.volume-section {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    max-width: 300px;
}

.volume-section .el-icon {
    cursor: pointer;
    color: #606266;
    font-size: 18px;
}

.rate-section {
    margin-top: 8px;
}

.audio-empty {
    padding: 40px;
    text-align: center;
}
</style>
