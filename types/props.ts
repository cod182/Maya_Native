type Creator = {
  username: string;
  avatar: string;
}

type VideoPostProps = {
  $id: any;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: Creator;
}