import VideoLightBox from 'components/video-with-lightbox'

export default function ourMission() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 my-24 items-center">
      <div>
        <h2>Our Mission</h2>

        <p>
          FNE International is a 501(c)3 organization that partners with
          communities in developing nations to improve housing, health, and
          education.
        </p>
        <p>
          By Facilitating collaboration and Networking with local and
          international organizations, we Empower individuals to become engaged
          in their community and the world.
        </p>
      </div>
      <div className="flex justify-center">
        <VideoLightBox
          src={
            'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffneinternational%2Fvideos%2F2017805304931251%2F&show_text=0&width=560'
          }
        >
          <div className="cursor-pointer">
            <img
              src="https://donate.fneinternacional.org/wp-content/uploads/2020/12/Screen-Shot-2020-12-08-at-7.42.54-PM-scaled.jpg"
              loading="lazy"
              style={{ maxWidth: 500 }}
              className="w-full"
            />
            <p className="italic my-0">Watch!</p>
          </div>
        </VideoLightBox>
      </div>
    </div>
  )
}
