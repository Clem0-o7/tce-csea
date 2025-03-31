"use client"

import React, { useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { format, isAfter } from "date-fns"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

const EventsSection = ({ events = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      containScroll: "keepSnaps",
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })],
  )

  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  if (!events || events.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-bold mb-8">Our Events</h2>
        <p className="text-muted-foreground">No events are currently available.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="text-center mb-12"
      >
        <h2 className="font-extrabold text-4xl sm:text-5xl text-gray-800 dark:text-gray-200 tracking-tight">
          Our Events
        </h2>
      </motion.div>

      <div className="overflow-hidden perspective" ref={emblaRef}>
        <div className="flex -ml-4">
          {events.map((event, index) => {
            const isCenter = index === selectedIndex
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: isCenter ? 1 : 0.9,
                  zIndex: isCenter ? 10 : 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="flex-[0_0_100%] md:flex-[0_0_40%] pl-4 transition-all duration-500"
                style={{
                  transform: `translateZ(${isCenter ? "50px" : "0px"})`,
                }}
              >
                <Card
                  className={`h-full transition-all duration-500 ${isCenter ? "shadow-2xl" : "shadow-md opacity-70"}`}
                >
                  <CardContent className="p-0">
                    <div className="relative w-full h-[400px] overflow-hidden">
                      <Image
                        src={event.eventImage || "/placeholder.svg"}
                        alt={event.name}
                        fill
                        className="object-contain"
                        priority={index === 0}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-4">{event.name}</h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        {event.date && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4 text-primary" />
                            <span>{format(new Date(event.date), "PPPP")}</span>
                          </div>
                        )}
                        {event.time && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-2 h-4 w-4 text-primary" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Participant Count */}
                      {event.participantsCount !== undefined && (
                        <div className="mb-6">
                          <span className="text-sm font-medium text-primary">
                            {event.participantsCount}+
                          </span>
                          <span className="text-sm text-muted-foreground ml-1">
                            participants
                          </span>
                        </div>
                      )}

                      {isAfter(new Date(event.date), new Date()) && event.registrationLink && (
                        <div className="mt-auto">
                          <Button
                            className={`w-full transition-all duration-500 ${isCenter ? "opacity-100" : "opacity-70"}`}
                            asChild
                          >
                            <Link href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                              Register Now
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default EventsSection
