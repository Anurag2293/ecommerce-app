"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"

const HomeCarousel = () => {
    return (
        <>
            <div>Carousel</div>
        </>
        // <Carousel 
        //     className="w-11/12"
        //     opts={{
        //         align: "start",
        //         loop: true,
        //     }}
        //     plugins={[
        //         Autoplay({
        //             delay: 2000,
        //             stopOnInteraction: true,
        //             stopOnMouseEnter: true,
        //             stopOnFocusIn: true,
        //             stopOnLastSnap: true,
        //         })
        //     ]}  
        // >
        //     <CarouselContent>
        //         {Array.from({ length: 5 }).map((_, index) => (
        //             <CarouselItem key={index}>
        //                 <div className="p-1">
        //                     <Card>
        //                         <CardContent className="flex aspect-video items-center justify-center p-6">
        //                             <span className="text-4xl font-semibold">{index + 1}</span>
        //                         </CardContent>
        //                     </Card>
        //                 </div>
        //             </CarouselItem>
        //         ))}
        //     </CarouselContent>
        //     {/* <CarouselPrevious />
        //     <CarouselNext /> */}
        // </Carousel>
    )
}

export default HomeCarousel;