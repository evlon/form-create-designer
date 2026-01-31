<template>
  <div class="fc-tdt-map-picker" :style="containerStyle">
    <div v-if="showHeader" class="map-header">
      <span class="map-title">{{ title }}</span>
      <div class="map-actions">
        <el-button size="small" @click="locateUser">
          <el-icon><Location /></el-icon>
        </el-button>
        <el-button size="small" @click="clearMarker">
          <el-icon><Delete /></el-icon>
        </el-button>
      </div>
    </div>

    <div ref="mapContainer" class="map-container" :style="{ height: `${height}px` }" />

    
    <div v-if="showAddress" class="address-info">
      <el-input
        v-model="address"
        readonly
        :placeholder="t('com.fcTdtMapPicker.addressPlaceholder')"
        size="small"
      >
        <template #append>
          <el-button @click="copyAddress">
            <el-icon><CopyDocument /></el-icon>
          </el-button>
        </template>
      </el-input>
    </div>

    <div v-if="showCoordinate" class="coordinate-info">
      <el-tag type="info" size="small">
        {{ t('com.fcTdtMapPicker.latLng') }}: {{ latitude }}, {{ longitude }}
      </el-tag>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, inject } from 'vue'
import { Location, Delete, CopyDocument } from '@element-plus/icons-vue'
import { t } from '../utils/locale'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showAddress: {
    type: Boolean,
    default: true
  },
  showCoordinate: {
    type: Boolean,
    default: true
  },
  height: {
    type: Number,
    default: 400
  },
  ak: {
    type: String,
    default: ''
  },
  center: {
    type: Array,
    default: () => [116.404, 39.915]
  },
  zoom: {
    type: Number,
    default: 12
  },
  markerDraggable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'locate', 'error'])

const designer = inject('designer')

const mapContainer = ref(null)
const address = ref('')
const latitude = ref(props.modelValue.lat || props.center[1])
const longitude = ref(props.modelValue.lng || props.center[0])

let map = null
let marker = null

const containerStyle = computed(() => {
  const style = {}
  if (designer?.layout?.width) {
    style.width = designer.layout.width
  }
  return style
})

function initMap() {
  if (!mapContainer.value) return

  const center = new window.TMap.LatLng(latitude.value, longitude.value)
  map = new window.TMap.Map(mapContainer.value, {
    center: center,
    zoom: props.zoom,
    mapStyleId: 'style1'
  })

  if (props.markerDraggable && (latitude.value || longitude.value)) {
    addMarker(center)
  }

  map.on('click', (evt) => {
    if (props.disabled) return
    const latLng = evt.latLng
    updatePosition(latLng.getLat(), latLng.getLng())
  })
}

function addMarker(latLng) {
  if (marker) {
    marker.setPosition(latLng)
  } else {
    marker = new window.TMap.Marker({
      position: latLng,
      map: map,
      draggable: props.markerDraggable
    })

    marker.on('dragend', () => {
      const pos = marker.getPosition()
      updatePosition(pos.getLat(), pos.getLng())
    })
  }
}

function updatePosition(lat, lng) {
  latitude.value = lat
  longitude.value = lng

  const value = {
    lat: lat,
    lng: lng,
    address: address.value
  }

  emit('update:modelValue', value)
  emit('change', value)

  if (props.markerDraggable) {
    addMarker(new window.TMap.LatLng(lat, lng))
  }

  reverseGeocode(lat, lng)
}

async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://apis.map.qq.com/ws/geocoder/v1/?location=${lat},${lng}&key=${props.ak}`
    )
    const data = await response.json()
    if (data.status === 0) {
      address.value = data.result.address
    } else {
      address.value = ''
    }
  } catch (err) {
    address.value = ''
    emit('error', { error: err.message })
  }
}

function locateUser() {
  if (!navigator.geolocation) {
    designer?.notify?.('warning', t('com.fcTdtMapPicker.geolocationNotSupported'))
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude: lat, longitude: lng } = position.coords
      updatePosition(lat, lng)
      map.setCenter(new window.TMap.LatLng(lat, lng))
      emit('locate', { lat, lng })
      designer?.notify?.('success', t('com.fcTdtMapPicker.locationFound'))
    },
    (err) => {
      emit('error', { error: err.message })
      designer?.notify?.('error', t('com.fcTdtMapPicker.locationFailed'))
    }
  )
}

function clearMarker() {
  latitude.value = props.center[1]
  longitude.value = props.center[0]
  address.value = ''

  emit('update:modelValue', { lat: null, lng: null, address: '' })
  emit('change', { lat: null, lng: null, address: '' })

  if (marker) {
    marker.setMap(null)
    marker = null
  }

  map.setCenter(new window.TMap.LatLng(props.center[1], props.center[0]))
}

function copyAddress() {
  if (address.value) {
    navigator.clipboard.writeText(address.value)
    designer?.notify?.('success', t('com.fcTdtMapPicker.addressCopied'))
  }
}

onMounted(() => {
  if (window.TMap) {
    initMap()
  } else {
    const script = document.createElement('script')
    script.src = `https://apis.map.qq.com/resources/gl/TMap.js?key=${props.ak}`
    script.onload = () => {
      initMap()
    }
    document.head.appendChild(script)
  }
})

onUnmounted(() => {
  if (map) {
    map.destroy()
  }
})

watch(() => props.modelValue, (val) => {
  if (val?.lat && val?.lng) {
    latitude.value = val.lat
    longitude.value = val.lng
    if (map && marker) {
      marker.setPosition(new window.TMap.LatLng(val.lat, val.lng))
    }
  }
}, { deep: true })
</script>

<style scoped>
.fc-tdt-map-picker {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.map-title {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.map-actions {
  display: flex;
  gap: 8px;
}

.map-container {
  width: 100%;
}

.address-info {
  padding: 12px 16px;
  border-top: 1px solid #ebeef5;
}

.coordinate-info {
  padding: 8px 16px;
  border-top: 1px solid #ebeef5;
}
</style>
