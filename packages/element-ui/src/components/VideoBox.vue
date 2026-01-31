<template>
    <div class="fc-video-box" :style="containerStyle">
        <div class="video-header" v-if="title && showHeader">
            <div class="video-title">{{ title }}</div>
        </div>
        
        <div class="video-content" :class="{ 'video-placeholder': !src }">
            <video
                v-if="src"
                ref="videoRef"
                :src="src"
                :poster="poster"
                :width="width"
                :height="height"
                :controls="controls"
                :autoplay="autoplay"
                :loop="loop"
                :muted="muted"
                :preload="preload"
                @play="onPlay"
                @pause="onPause"
                @ended="onEnded"
                @timeupdate="onTimeUpdate"
                @volumechange="onVolumeChange"
                @loadeddata="onLoadedData"
                @error="onError"
            >
                <template v-if="tracks.length">
                    <track
                        v-for="(track, index) in tracks"
                        :key="index"
                        :kind="track.kind"
                        :src="track.src"
                        :srclang="track.srclang"
                        :label="track.label"
                        :default="track.default"
                    />
                </template>
                {{ t('com.videoBox.notSupported') }}
            </video>
            
            <div v-else class="video-empty">
                <el-empty :description="t('com.videoBox.noVideo')">
                    <template v-if="!disabled">
                        <el-button type="primary" @click="selectVideo">
                            <el-icon><VideoPlay /></el-icon>
                            {{ t('com.videoBox.selectVideo') }}
                        </el-button>
                    </template>
                </el-empty>
            </div>
        </div>
        
        <div class="video-controls" v-if="showCustomControls && src">
            <div class="progress-bar" @click="seekTo">
                <div class="progress" :style="{ width: progressPercent + '%' }"></div>
            </div>
            <div class="controls-row">
                <div class="controls-left">
                    <el-button size="small" text @click="togglePlay">
                        <el-icon>
                            <VideoPause v-if="isPlaying" />
                            <VideoPlay v-else />
                        </el-icon>
                    </el-button>
                    <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
                </div>
                <div class="controls-right">
                    <el-select v-model="playbackRate" size="small" style="width: 80px" @change="onRateChange">
                        <el-option label="0.5x" :value="0.5" />
                        <el-option label="0.75x" :value="0.75" />
                        <el-option label="1x" :value="1" />
                        <el-option label="1.25x" :value="1.25" />
                        <el-option label="1.5x" :value="1.5" />
                        <el-option label="2x" :value="2" />
                    </el-select>
                    <el-button size="small" text @click="toggleMute">
                        <el-icon>
                            <VideoCamera v-if="!muted && volume > 0" />
                            <Mute v-else />
                        </el-icon>
                    </el-button>
                    <el-slider
                        v-model="volume"
                        :max="1"
                        :step="0.1"
                        style="width: 80px"
                        @change="onVolumeChangeHandler"
                    />
                    <el-button size="small" text @click="toggleFullscreen">
                        <el-icon><FullScreen /></el-icon>
                    </el-button>
                </div>
            </div>
        </div>
        
        <input
            type="file"
            ref="fileInputRef"
            accept="video/*"
            style="display: none"
            @change="onFileChange"
        />
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { VideoPlay, VideoPause, VideoCamera, FullScreen } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'VideoBox',
    components: {
        VideoPlay,
        VideoPause,
        VideoCamera,
        FullScreen
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'update:src', 'change', 'play', 'pause', 'ended', 'timeupdate', 'error', 'loadeddata'],
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
        poster: {
            type: String,
            default: ''
        },
        width: {
            type: [Number, String],
            default: '100%'
        },
        height: {
            type: [Number, String],
            default: 400
        },
        disabled: {
            type: Boolean,
            default: false
        },
        controls: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        loop: {
            type: Boolean,
            default: false
        },
        muted: {
            type: Boolean,
            default: false
        },
        preload: {
            type: String,
            default: 'auto'
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        showCustomControls: {
            type: Boolean,
            default: false
        },
        tracks: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit, expose }) {
        const videoRef = ref(null);
        const fileInputRef = ref(null);
        const isPlaying = ref(false);
        const currentTime = ref(0);
        const duration = ref(0);
        const volume = ref(props.muted ? 0 : 1);
        const playbackRate = ref(1);
        
        const containerStyle = computed(() => {
            const style = {};
            if (typeof props.width === 'number') {
                style.width = props.width + 'px';
            } else {
                style.width = props.width;
            }
            if (typeof props.height === 'number') {
                style.height = props.height + 'px';
            } else {
                style.height = props.height;
            }
            return style;
        });
        
        const progressPercent = computed(() => {
            if (!duration.value) return 0;
            return (currentTime.value / duration.value) * 100;
        });
        
        const formatTime = (seconds) => {
            if (!seconds || isNaN(seconds)) return '00:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        };
        
        const selectVideo = () => {
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
            if (!videoRef.value) return;
            if (isPlaying.value) {
                videoRef.value.pause();
            } else {
                videoRef.value.play();
            }
        };
        
        const toggleMute = () => {
            if (!videoRef.value) return;
            videoRef.value.muted = !videoRef.value.muted;
            volume.value = videoRef.value.muted ? 0 : 1;
        };
        
        const toggleFullscreen = () => {
            if (!videoRef.value) return;
            if (videoRef.value.requestFullscreen) {
                videoRef.value.requestFullscreen();
            }
        };
        
        const seekTo = (event) => {
            if (!videoRef.value) return;
            const rect = event.currentTarget.getBoundingClientRect();
            const percent = (event.clientX - rect.left) / rect.width;
            videoRef.value.currentTime = percent * duration.value;
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
            emit('ended');
        };
        
        const onTimeUpdate = () => {
            if (videoRef.value) {
                currentTime.value = videoRef.value.currentTime;
            }
            emit('timeupdate', { currentTime: currentTime.value });
        };
        
        const onVolumeChange = () => {
            if (videoRef.value) {
                volume.value = videoRef.value.volume;
            }
        };
        
        const onVolumeChangeHandler = (val) => {
            if (!videoRef.value) return;
            videoRef.value.volume = val;
            videoRef.value.muted = val === 0;
        };
        
        const onRateChange = (rate) => {
            if (!videoRef.value) return;
            videoRef.value.playbackRate = rate;
        };
        
        const onLoadedData = () => {
            if (videoRef.value) {
                duration.value = videoRef.value.duration;
            }
            emit('loadeddata');
        };
        
        const onError = (event) => {
            emit('error', event);
        };
        
        const play = () => videoRef.value?.play();
        const pause = () => videoRef.value?.pause();
        const reset = () => {
            if (videoRef.value) {
                videoRef.value.currentTime = 0;
                pause();
            }
        };
        
        expose({ play, pause, reset, videoRef });
        
        watch(() => props.src, (newSrc) => {
            if (newSrc && videoRef.value) {
                videoRef.value.load();
            }
        });
        
        return {
            t,
            videoRef,
            fileInputRef,
            containerStyle,
            isPlaying,
            currentTime,
            duration,
            volume,
            playbackRate,
            progressPercent,
            formatTime,
            selectVideo,
            onFileChange,
            togglePlay,
            toggleMute,
            toggleFullscreen,
            seekTo,
            onPlay,
            onPause,
            onEnded,
            onTimeUpdate,
            onVolumeChange,
            onVolumeChangeHandler,
            onRateChange,
            onLoadedData,
            onError
        };
    }
});
</script>

<style>
.fc-video-box {
    width: 100%;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow: hidden;
}

.video-header {
    padding: 12px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
}

.video-title {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}

.video-content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;
}

.video-content video {
    max-width: 100%;
    display: block;
}

.video-placeholder {
    min-height: 200px;
}

.video-empty {
    width: 100%;
    padding: 40px;
}

.video-controls {
    padding: 12px 16px;
    background: #f5f7fa;
    border-top: 1px solid #e4e7ed;
}

.progress-bar {
    height: 4px;
    background: #dcdfe6;
    border-radius: 2px;
    cursor: pointer;
    margin-bottom: 8px;
}

.progress {
    height: 100%;
    background: #409EFF;
    border-radius: 2px;
    transition: width 0.1s;
}

.controls-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.controls-left,
.controls-right {
    display: flex;
    align-items: center;
    gap: 8px;
}

.time-display {
    font-size: 12px;
    color: #606266;
    min-width: 100px;
}
</style>
