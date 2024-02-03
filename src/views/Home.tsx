import {MediaItem} from '../types/DBTypes';
import FeedRow from '../components/FeedRow';



const Home = () => {  const mediaArray: MediaItem[] = [
    {
      book_id: 8,
      user_id: 5,
      filename: 'https://place-hold.it/1200x800.jpg&text=Pic1&fontsize=120',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb2&fontsize=20',
      book_genre: 'Fiction',
      series_name: 'The Chronicles of Narnia',
      filesize: 170469,
      media_type: 'image/jpeg',
      title: 'Picture 1',
      description: 'Fans can now watch episode 1 of season 2 of Spy x Family on Crunchyroll. New English dubbed episodes will be released every week for fans to enjoy. Spy x Family season 2 was released on October 7, 2023, and has three episodes available for streaming',
      created_at: '2024-01-07T20:49:34.000Z',
    },
    {
      book_id: 9,
      user_id: 7,
      filename: 'https://place-hold.it/800x600.jpg&text=Pic2&fontsize=72',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb3&fontsize=20',
      book_genre: 'Fiction',
      series_name: 'Spy x Family',
      filesize: 1002912,
      media_type: 'image/jpeg',
      title: 'Volume 1',
      description: 'tähän tuleee kuvaus kirjasta',
      created_at: '2024-01-07T21:32:27.000Z',
    },
    {
      book_id: 17,
      user_id: 2,
      filename:
        'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb1&fontsize=20',
      book_genre: 'Non-Fiction',
      series_name: 'call of the night',
      filesize: 1236616,
      media_type: 'image/jpeg',
      title: 'Volume 2',
      description: 'tähän tuleee kuvaus kirjasta',
      created_at: '2024-01-07T20:48:13.000Z',
    },
    {
      book_id: 18,
      user_id: 3,
      filename: 'https://place-hold.it/800x600.jpg&text=Pic4&fontsize=72',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb4&fontsize=20',
      book_genre: 'Non-Fiction',
      series_name: 'call of the night',
      filesize: 1002912,
      media_type: 'image/jpeg',
      title: 'Volume 3',
      description: 'tähän tuleee kuvaus kirjasta',
      created_at: '2024-01-07T21:32:27.000Z',
    },
    {
      book_id: 19,
      user_id: 4,
      filename: 'https://place-hold.it/800x600.jpg&text=Pic5&fontsize=72',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb5&fontsize=20',
      book_genre: 'Non-Fiction',
      series_name: 'call of the night',
      filesize: 1002912,
      media_type: 'image/jpeg',
      title: 'Volume 4',
      description: 'tähän tuleee kuvaus kirjasta',
      created_at: '2024-01-07T21:32:27.000Z',
    },
    {
      book_id: 20,
      user_id: 5,
      filename: 'https://place-hold.it/800x600.jpg&text=Pic6&fontsize=72',
      thumbnail: 'http://place-hold.it/320/240.jpg&text=Thumb6&fontsize=20',
      book_genre: 'Non-Fiction',
      series_name: 'call of the night',
      filesize: 1002912,
      media_type: 'image/jpeg',
      title: 'Volume 5',
      description: 'tähän tuleee kuvaus kirjasta',
      created_at: '2024-01-07T21:32:27.000Z',
    },
  ];

  return (
    <>
      <h2>Activity</h2>
      <div className="activity">
      {mediaArray.map((item) => ( <FeedRow key={item.book_id} item={item} />
      ))}
      </div>
    </>
  );
};
export default Home;
