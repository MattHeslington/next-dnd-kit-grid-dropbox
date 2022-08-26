import React, { useCallback, useEffect, useState } from 'react'
import { DndContext, closestCenter, MouseSensor, TouchSensor, DragOverlay, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { nanoid } from 'nanoid'

import { SortablePhoto } from 'components/SortablePhoto'

import Layout from 'layouts/default-layout'

import Dropzone from 'components/dropzone'

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
                setPreviewImages((prevState) => [...prevState, file.path])
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
            console.log('activeId: ', active.id)
            console.log('overId: ', over.id)
            setPreviewImages((previewImages) => {
                const oldIndex = previewImages.indexOf(active.id)
                const newIndex = previewImages.indexOf(over.id)
                console.log('oldIndex: ', oldIndex, ' newIndex: ', newIndex)
                return arrayMove(previewImages, oldIndex, newIndex)
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
