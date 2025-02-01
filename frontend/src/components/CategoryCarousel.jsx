import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "FullStack Developer",
    "Graphics Designer"
]

const CategoryCarousel = (query) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchJobHandler = (query) => {
        dispatch(setSearchQuery(query))
        navigate("/browse")
    }
    return (
        <div >
            <Carousel className="w-full max-w-lg mx-auto my-16">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-auto lg:basis-auto" key={index}>
                                <Button 
                                onClick={()=>searchJobHandler(cat)}
                                className="rounded-full" >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))

                    }

                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default CategoryCarousel