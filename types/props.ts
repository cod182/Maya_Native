type Creator = {
  username: string;
  avatar: string;
}

type VideoPostProps = {
  $id: any;
  key: number;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: Creator;
  bookmarked_by: Array<string>;
}