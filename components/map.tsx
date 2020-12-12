import React, { useEffect, useState } from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import { GetProjectsQuery } from 'generated/graphql'
import 'mapbox-gl/dist/mapbox-gl.css'
import cx from 'classnames'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoibWF4c21vdWhhIiwiYSI6ImNraTIxdHE4MTJ3dGQyc24zZ2gwMWZwOTcifQ.-sbZ1N_VS6AOcUaP8k0L3w',
})

export type Projects = GetProjectsQuery['projects']['nodes']
export type Project = GetProjectsQuery['projects']['nodes'][0]['projectDetails']

interface MapperProps {
  projects: Projects
  countryFilter?: string
}

export const Mapper = (props: MapperProps) => {
  // If country filter exists, only display results in that country
  const projects = props.countryFilter
    ? props.projects.filter(
        (p) => p.projectDetails.location.country === props.countryFilter
      )
    : props.projects

  const startLat =
    projects.reduce((a, c) => a + c.projectDetails.location.latitude, 0) /
    projects.length
  const startLong =
    projects.reduce((a, c) => a + c.projectDetails.location.longitude, 0) /
    projects.length

  const [center, setCenter] = useState<[number, number]>([startLong, startLat])
  const [zoom, setZoom] = useState<number>(6)
  const [station, setStation] = useState<number>()
  const [showProjects, setShowProjects] = useState<boolean>(true)
  const [width, setWidth] = useState<number>()
  const [overlay, setOverlay] = useState<boolean>(false)
  const [pop, setPop] = useState<boolean>(false)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  const StationPopUp = () => {
    const project = projects[station]?.projectDetails

    return !!(station || station === 0) ? (
      <div
        onClick={markerUnclick}
        className={cx('flex fixed items-end justify-center fill overlay z-30', {
          fadein: overlay,
          fadeout: !overlay,
        })}
      >
        <div
          className={cx(
            'flex flex-wrap w-full relative bg-white rounded mx-2 p-4 slideup',
            {
              slideup: pop,
              slidedown: !pop,
            }
          )}
          style={{
            marginBottom: '4em',
            maxHeight: '65vh',
            overflowY: 'scroll',
            maxWidth: '1100px',
          }}
        >
          <div className="col-m-50">
            <div
              className="absolute top-0 right-0 mr-1"
              onClick={markerUnclick}
            >
              x
            </div>
            {/*make sure to add .url here */}
            <h3 className="hover">{project.projectName}</h3>
            <p>project descriptions</p>
          </div>
          <div className="col-m-50 text-right">
            {/* <img
              src={project.image.sourceUrl}
              alt="gallery"
              style={{ marginTop: '0.5em', maxWidth: '100%' }}
              className={width < 599 ? 'hidden' : null}
            /> */}
          </div>
        </div>
      </div>
    ) : null
  }

  function markerClick(position, station) {
    return () => {
      setCenter(position)
      setStation(station)
      setOverlay(true)
      setPop(true)
    }
  }

  function markerUnclick() {
    setOverlay(false)
    setTimeout(() => setStation(undefined), 200)
  }

  return (
    <>
      <StationPopUp />
      <Map
        style="mapbox://styles/maxsmouha/cki220es10vih19tlutvb7v9f"
        containerStyle={{
          height: '100%',
          width: '100%',
          position: 'relative',
        }}
        center={center}
        zoom={[zoom]}
      >
        <div className="absolute top-0 right-0 m-4 text-left rounded bg-white z-20 px-4">
          <p
            className="my-2 cursor-pointer"
            onClick={() => setShowProjects(showProjects)}
          >
            Projects
          </p>
          <ul className={showProjects && width < 599 ? 'hidden mt-2' : 'mb-4'}>
            {projects.map((p, i) => (
              <li
                key={i}
                className="hover text-sm py-1"
                onClick={markerClick(
                  [
                    p.projectDetails.location.longitude,
                    p.projectDetails.location.latitude,
                  ],
                  i
                )}
              >
                {i + 1}. {p.projectDetails.projectName}
              </li>
            ))}
          </ul>
        </div>

        {/* Zoom Controls */}
        <div className="absolute z-10 bottom-0 right-0 mx-4 mb-8">
          <button
            className="button flex items-center justify-center font-bold text-base cursor-pointer ml-auto mb-1"
            onClick={() => setZoom(zoom + 1)}
            style={{ width: '3rem', height: '3rem' }}
          >
            +
          </button>
          <button
            className="button flex items-center justify-center font-bold text-base cursor-pointer ml-auto"
            onClick={() => setZoom(zoom - 1)}
            style={{ width: '3rem', height: '3rem' }}
          >
            -
          </button>
        </div>

        {projects.map((p, i) => (
          <Marker
            key={i}
            onClick={markerClick(
              [
                p.projectDetails.location.longitude,
                p.projectDetails.location.latitude,
              ],
              i
            )}
            coordinates={[
              p.projectDetails.location.longitude,
              p.projectDetails.location.latitude,
            ]}
          >
            <div
              className="rounded-full flex items-center justify-center bg-white border cursor-pointer"
              style={{ width: '3em', height: '3em' }}
            >
              <h4 className="b">{i + 1}</h4>
            </div>
          </Marker>
        ))}
      </Map>
    </>
  )
}

export default Mapper
