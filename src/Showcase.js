import React from "react";
import { Image } from "semantic-ui-react";

const RFLINK = "https://fusillofoto.com";
const GSM = "https://gunnshotsmedia.wixsite.com/mysite";

const ImageExampleGroupSize = () => (
  <div>
    <h1>
      Photos by Richard Fusillo (Five Cites) Website ----{" "}
      <a href={RFLINK}>Richard Fusillo Website</a>
    </h1>
    <h3>Photos from 2013</h3>
    <Image.Group size="small">
      <Image
        src={
          "https://i.ibb.co/whMGBxs/PVHerrera-1-zps44718605-jpg-original.jpg"
        }
      />
      <Image
        src={
          "https://i.ibb.co/z57C051/PVHerrera-2-zps666f4306-jpg-original.jpg"
        }
      />
      <Image
        src={
          "https://i.ibb.co/DVy6Cqz/PVHerrera-3-zpsbfd4bacd-jpg-original.jpg"
        }
      />
      <Image
        src={
          "https://i.ibb.co/zfhgJLj/PVHerrera-4-zps66b965dd-jpg-original.jpg"
        }
      />
      <Image
        src={
          "https://i.ibb.co/KqwLzfk/PVHerrera-10-zps3ebda96a-jpg-original.jpg"
        }
      />
      <Image
        src={
          "https://i.ibb.co/98fpDFT/PVHerrera-11-2-zps5484b994-jpg-original.jpg"
        }
      />
    </Image.Group>

    <h1>
      Photos by Gunn Shot Media (Gunner Velten) (Five Cites) Website ----{" "}
      <a href={GSM}> Gunn Shots Media</a>
    </h1>
    <h3>Photos from 2018</h3>
    <Image.Group size="small">
      <Image src={"https://i.ibb.co/qg4VF6P/IMG-0043.jpg"} />
      <Image src={"https://i.ibb.co/99gjZGY/IMG-0045-2.jpg"} />
      <Image src={"https://i.ibb.co/KwtzBX7/IMG-0044.jpg"} />
      <Image src={"https://i.ibb.co/jr4sCdv/IMG-0046.jpg"} />
      <Image src={"https://i.ibb.co/BGpjzQz/IMG-0047.jpg"} />
      <Image src={"https://i.ibb.co/1r9N6pj/IMG-0048-2.jpg"} />
    </Image.Group>
  </div>
);

export default ImageExampleGroupSize;
