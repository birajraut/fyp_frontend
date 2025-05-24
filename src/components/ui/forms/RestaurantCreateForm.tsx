/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useRef, useEffect } from 'react';
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import CustomButton from "../CustomButton";
import { createRestaurant } from "../../../services/restaurant";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Model from '../Model';
import MapComponent from '../../map/Map';
// import React from 'react';


// Initialize Mapbox
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string;

interface IProps {
    setIsModalOpen: (data: boolean) => void;
}

interface FormValues {
    name: string;
    description: string;
    phone: number;
    address: string;
    latitude?: number;
    longitude?: number;
    image: File | null;
    category: string;
}

const RestaurantCreateForm = ({ setIsModalOpen }: IProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [mapboxLoaded, setMapboxLoaded] = useState<boolean>(false);
    const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
    const addressInputRef = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<any>(null);

    // Load Mapbox GL JS and Geocoder
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js`;
        script.onload = () => setMapboxLoaded(true);
        document.head.appendChild(script);

        const css = document.createElement('link');
        css.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css';
        css.rel = 'stylesheet';
        document.head.appendChild(css);

        return () => {
            document.head.removeChild(script);
            document.head.removeChild(css);
        };
    }, []);

    // Initialize autocomplete when Mapbox is loaded
    useEffect(() => {
        if (!mapboxLoaded || !addressInputRef.current) return;

        const MapboxGeocoder = (window as any).MapboxGeocoder;
        autocompleteRef.current = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            types: 'address,place,postcode,locality,neighborhood',
            placeholder: 'Search for restaurant address',
            marker: true,
            flyTo: false,
            
        });

        autocompleteRef.current.addTo(addressInputRef.current);

        // Handle when a result is selected
        autocompleteRef.current.on('result', (e: any) => {
            const [longitude, latitude] = e.result.center;
            formik.setValues({
                ...formik.values,
                address: e.result.place_name,
                latitude,
                longitude,
            });
            setSelectedLocation({
                lat: latitude,
                lng: longitude,
                address: e.result.place_name
            });
        });

        // Clear coordinates when input is cleared
        autocompleteRef.current.on('clear', () => {
            formik.setFieldValue('latitude', undefined);
            formik.setFieldValue('longitude', undefined);
            setSelectedLocation(null);
        });

        return () => {
            if (autocompleteRef.current) {
                // autocompleteRef.current.off('result');
                // autocompleteRef.current.off('clear');
            }
        };
    }, [mapboxLoaded]);

    // Initialize map when map modal is opened


    const handleSelectLocation = () => {
        console.log(selectedLocation,'selected location')
        if (autocompleteRef.current && addressInputRef.current) {
            const inputEl:any = addressInputRef.current.querySelector('input');
            if (inputEl) {
            inputEl.value = selectedLocation?.address;
        }
        }



        if (selectedLocation) {
            formik.setValues({
                ...formik.values,
                address: selectedLocation.address,
                latitude: selectedLocation.lat,
                longitude: selectedLocation.lng
            });
            setIsMapModalOpen(false);
        }
    };
    const formik = useFormik<FormValues>({
        initialValues: {
            name: '',
            description: '',
            phone: 0,
            address: selectedLocation?.address || '',
            latitude: undefined,
            longitude: undefined,
            image: null,
            category: '',
        },
        validateOnChange: false,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required.'),
            description: Yup.string().required('Restaurant Description cannot be empty.'),
            phone: Yup.number().required('Phone number is required.'),
            address: Yup.string().required('Address is required.'),
            latitude: Yup.number().required('Please select a valid address from the suggestions'),
            longitude: Yup.number().required('Please select a valid address from the suggestions'),
            category: Yup.string().required('Category is required.'),
        }),
        onSubmit: async (values) => {
            try {
                if (!values.latitude || !values.longitude) {
                    toast.error('Please select a valid address from the suggestions');
                    return;
                }

                setLoading(true);
                await createRestaurant({
                    name: values.name,
                    description: values.description,
                    phone: values.phone,
                    address: values.address,
                    lat: values.latitude,
                    lng: values.longitude,
                    image: values.image,
                    category: values.category,
                });
                setIsModalOpen(false);
                toast.success('Request sent successfully. You will be notified after the request is accepted.');
            } catch (error: any) {
                console.log(error);
                toast.error(error.response?.data?.message || 'Error submitting form');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="space-y-3">
                <Input 
                    type="text" 
                    name="name" 
                    placeholder="Restaurant Name" 
                    onChange={formik.handleChange} 
                    label="Restaurant Name" 
                    error={formik.errors.name} 
                />

                <Textarea 
                    name="description" 
                    placeholder="Description" 
                    onChange={formik.handleChange} 
                    label="Restaurant Description" 
                    error={formik.errors.description} 
                />

            
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                </label>
                <select
                    id="category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    aria-label="Select Category"
                >
                    <option value="" disabled>
                        Select Category
                    </option>
                    <option value="Nepali">Nepali</option>
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Continental">Continental</option>                    
                </select>
                {formik.errors.category && (
                    <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
                )}
            

                <Textarea 
                    name="phone" 
                    placeholder="phone number" 
                    onChange={formik.handleChange} 
                    label="Phone Number" 
                    error={formik.errors.phone} 
                />

                <FileInput getFile={(file)=> formik.setValues({...formik.values, image: file})} />

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Restaurant Address *
                    </label>
                    <div ref={addressInputRef} />
                    <div className="mt-2">
                        <button
                            type="button"
                            onClick={() => setIsMapModalOpen(true)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            Or choose location on map
                        </button>
                    </div>
                    {formik.errors.address && (
                        <p className="mt-1 text-sm text-red-600">{formik.errors.address}</p>
                    )}
                    {(formik.errors.latitude || formik.errors.longitude) && (
                        <p className="mt-1 text-sm text-red-600">
                            Please select a valid address from the suggestions
                        </p>
                    )}
                </div>

                <div className='mt-10'>
                    <CustomButton 
                        type="submit" 
                        label="Request" 
                        loading={loading} 
                        className='mx-auto mt-10' 
                    />
                </div>
            </form>

            {/* Map Selection Modal */}
            <Model openModel={isMapModalOpen}  setModelOpen={setIsMapModalOpen} title="Select Location"
            
            body={
                <>

<MapComponent selectedLocation={selectedLocation} 

setSelectedLocation={(location)=>setSelectedLocation(location)} 

accessToken={mapboxgl.accessToken || "Missing Map Token"}/>
              
                
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => setIsMapModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSelectLocation}
                        disabled={!selectedLocation}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-md ${selectedLocation ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
                    >
                        Select Location
                    </button>
                </div>
     </>
            }
            />
        </>
    );
};

export default RestaurantCreateForm;