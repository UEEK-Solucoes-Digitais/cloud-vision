import { MapStyle } from '@/components/map/map-style'
import { Autocomplete, GoogleMap, type Libraries, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useMemo, useState } from 'react'
import Button from '../button/Button'
import Iconify from '../iconify/IconifyIcon'
import Input from '../input/Input'
import styles from './styles.module.scss'

interface Coordinates {
    lat: number
    lng: number
}

interface MapPickerProps {
    setCoordinates: (latitude: number, longitude: number, address?: string) => void
    initialCoordinates?: Coordinates
    onSetMap: (state: string, city: string) => void
}

const libraries = ['places', 'geometry', 'drawing'] as Libraries

function MapPicker({ setCoordinates, initialCoordinates, onSetMap }: MapPickerProps) {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [marker, setMarker] = useState<google.maps.Marker | null>(null)
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
    const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null)
    const [markerExists, setMarkerExists] = useState(false)

    const mapOptions = useMemo(
        () => ({
            disableDefaultUI: true,
            zoomControl: true,
            styles: MapStyle,
        }),
        [],
    )

    const onLoad = useCallback(
        (map: google.maps.Map) => {
            setMap(map)
            if (initialCoordinates) {
                map.setCenter(initialCoordinates)
                const newMarker = new google.maps.Marker({
                    map,
                    position: initialCoordinates,
                })
                setMarker(newMarker)
                setMarkerExists(true)
            }

            if (!geocoder) {
                setGeocoder(new google.maps.Geocoder())
            }
        },
        [initialCoordinates, geocoder],
    )

    const onMapClick = useCallback(
        (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
                const lat = event.latLng.lat()
                const lng = event.latLng.lng()

                if (marker) {
                    marker.setPosition(event.latLng)
                } else {
                    const newMarker = new google.maps.Marker({
                        map,
                        position: event.latLng,
                    })
                    setMarker(newMarker)
                }
                setMarkerExists(true)

                if (geocoder) {
                    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                        if (status === 'OK' && results) {
                            const address = results[0].formatted_address
                            const addressComponents = results[0].address_components
                            const city =
                                addressComponents.find((component) => component.types.includes('locality'))
                                    ?.long_name ?? ''
                            const state =
                                addressComponents.find((component) =>
                                    component.types.includes('administrative_area_level_1'),
                                )?.long_name ?? ''

                            setCoordinates(lat, lng, address)
                            onSetMap(state, city)
                        } else {
                            console.error('Geocoder failed due to:', status)
                        }
                    })
                } else {
                    setCoordinates(lat, lng)
                }
            }
        },
        [setCoordinates, marker, geocoder, map, onSetMap],
    )

    const onUnmount = useCallback(() => {
        setMap(null)
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY,
        libraries,
    })

    const handlePlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace()
            if (place.geometry?.location) {
                const location = place.geometry.location
                const lat = location.lat()
                const lng = location.lng()
                const address = place.formatted_address ?? ''

                setCoordinates(lat, lng, address)
                map?.setCenter(location)
                map?.setZoom(16)

                if (marker) {
                    marker.setPosition(location)
                } else {
                    const newMarker = new google.maps.Marker({
                        map,
                        position: location,
                    })
                    setMarker(newMarker)
                }
                setMarkerExists(true)
            }
        }
    }

    const onLoadAutocomplete = (autocompleteInstance: google.maps.places.Autocomplete) =>
        setAutocomplete(autocompleteInstance)

    const handleShowMarker = () => {
        if (marker && map) {
            map.setCenter(marker.getPosition()!)
            map.setZoom(16)
        }
    }

    return (
        <>
            {isLoaded && (
                <>
                    <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={handlePlaceChanged}>
                        <div className={styles.flexMap}>
                            <Input
                                defaultValue=''
                                required={false}
                                placeholder='Procurar endereço'
                                type='text'
                                maxLength={250}
                                name='link'
                            />

                            <Button type='button' fitContent onClick={handleShowMarker} disabled={!markerExists}>
                                <Iconify icon='el:map-marker-alt' />
                                Ir até o marcador
                            </Button>
                        </div>
                    </Autocomplete>

                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '500px' }}
                        center={initialCoordinates || { lat: -27.827097, lng: -50.33408 }}
                        zoom={initialCoordinates ? 16 : 13}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        onClick={onMapClick}
                        options={mapOptions}
                    />
                </>
            )}
        </>
    )
}

export default MapPicker
