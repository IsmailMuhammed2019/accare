'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

export function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const initMap = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      
      // If no API key is provided, show fallback content
      if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="height: 400px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;">
              <div style="text-align: center; padding: 20px;">
                <div style="font-size: 48px; margin-bottom: 16px;">📍</div>
                <h3 style="margin: 0 0 16px 0; font-size: 24px; font-weight: bold;">Service Area</h3>
                <p style="margin: 0 0 8px 0; font-size: 18px;">Connecticut & Surrounding Areas</p>
                <p style="margin: 0 0 16px 0; font-size: 14px; opacity: 0.9;">
                  We provide in-home care services throughout Connecticut
                </p>
                <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 8px; margin-top: 16px;">
                  <p style="margin: 0; font-size: 14px;">
                    <strong>Contact us:</strong><br>
                    📞 (203) 904-4883<br>
                    📧 contact@accareservice.com
                  </p>
                </div>
              </div>
            </div>
          `
        }
        return
      }

      const loader = new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places']
      })

      try {
        const google = await loader.load()
        
        if (mapRef.current) {
          // Center on Connecticut
          const connecticut = { lat: 41.6032, lng: -73.0877 }
          
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: connecticut,
            zoom: 8,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          })

          // Add marker for A&C Care
          new google.maps.Marker({
            position: connecticut,
            map: mapInstance,
            title: 'A&C Care - In-Home Care Services',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
                  <path d="M20 8c-4.4 0-8 3.6-8 8 0 6 8 16 8 16s8-10 8-16c0-4.4-3.6-8-8-8zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 20)
            }
          })

          // Add service area circle
          new google.maps.Circle({
            strokeColor: '#3B82F6',
            strokeOpacity: 0.3,
            strokeWeight: 2,
            fillColor: '#3B82F6',
            fillOpacity: 0.1,
            map: mapInstance,
            center: connecticut,
            radius: 50000, // 50km radius
          })

          // Add info window
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; max-width: 200px;">
                <h3 style="margin: 0 0 5px 0; color: #1F2937; font-size: 16px; font-weight: bold;">
                  A&C Care
                </h3>
                <p style="margin: 0; color: #6B7280; font-size: 14px;">
                  Professional In-Home Care Services<br>
                  Connecticut & Surrounding Areas
                </p>
                <p style="margin: 5px 0 0 0; color: #3B82F6; font-size: 12px;">
                  📞 (203) 904-4883
                </p>
              </div>
            `
          })

          // Add click listener to marker
          google.maps.event.addListener(mapInstance, 'click', () => {
            infoWindow.open(mapInstance, new google.maps.Marker({
              position: connecticut,
              map: mapInstance
            }))
          })


        }
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        // Fallback content if map fails to load
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="height: 400px; display: flex; align-items: center; justify-content: center; background: #f3f4f6; color: #6b7280;">
              <div style="text-align: center;">
                <h3 style="margin: 0 0 10px 0; color: #374151;">Service Area</h3>
                <p style="margin: 0;">Connecticut & Surrounding Areas</p>
                <p style="margin: 10px 0 0 0; font-size: 14px;">
                  Contact us to confirm availability in your location
                </p>
              </div>
            </div>
          `
        }
      }
    }

    initMap()
  }, [])

  return (
    <div className="w-full">
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg"
        style={{ minHeight: '400px' }}
      />
      <div className="p-4 bg-gray-50 border-t">
        <p className="text-sm text-gray-600 text-center">
          We provide in-home care services throughout Connecticut and surrounding areas. 
          Contact us to confirm service availability in your specific location.
        </p>
      </div>
    </div>
  )
}
