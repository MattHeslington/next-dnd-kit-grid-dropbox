import React, { useCallback, useEffect, useState } from 'react'
import { DndContext, closestCenter, MouseSensor, TouchSensor, DragOverlay, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { nanoid } from 'nanoid'

import { Grid } from 'components/Grid'
import { SortablePhoto } from 'components/SortablePhoto'

import Layout from 'layouts/default-layout'

import Dropzone from 'components/dropzone'
import photos from 'libs/photos'

const UploadGallery = () => {
    const [items, setItems] = useState([])
    const [previewImages, setPreviewImages] = useState([])
    const [activeId, setActiveId] = useState(null)
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader()
            reader.onload = function (e) {
                setItems((prevState) => [...prevState, { id: nanoid(), file: file, src: e.target.result }])
                setPreviewImages((prevState) => [...prevState, e.target.result])
            }
            reader.readAsDataURL(file)
            return file
        })
    }, [])

    const accept = {
        'image/png': ['.png'],
        'image/jpg': ['.jpg', '.jpeg'],
        'image/webp': ['.webp'],
    }

    useEffect(() => {
        console.log('items: ', items)
    }, [items])

    useEffect(() => {
        console.log('previewImages: ', previewImages)
    }, [previewImages])

    return (
        <>
            <Dropzone onDrop={onDrop} accept={accept} />
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}>
                <SortableContext items={previewImages} strategy={rectSortingStrategy}>
                    <div className='grid grid-cols-4 gap-5'>
                        {/* {items.length > 0 && items.map((url, index) => <SortablePhoto key={url?.id} url={url?.src} index={index} />)} */}
                        {/* {items.length > 0 && items.map(({ id, src }, index) => <SortablePhoto key={id} url={src} index={index} />)} */}
                        {previewImages.map((url, index) => (
                            <SortablePhoto key={url} url={url} index={index} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </>
    )

    function handleDragStart(event) {
        setActiveId(event.active.id)
    }

    function handleDragEnd(event) {
        const { active, over } = event

        if (active.id !== over.id) {
            setPreviewImages((previewImages) => {
                const oldIndex = previewImages.indexOf(active.id)
                const newIndex = previewImages.indexOf(over.id)

                return arrayMove(previewImages, oldIndex, newIndex)
            })
            setItems((items) => {
                const oldIndex = items.indexOf(active.id)
                const newIndex = items.indexOf(over.id)

                return arrayMove(items, oldIndex, newIndex)
            })
        }

        setActiveId(null)
    }

    function handleDragCancel() {
        setActiveId(null)
    }
}

UploadGallery.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export default UploadGallery
