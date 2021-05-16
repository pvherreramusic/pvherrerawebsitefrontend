import React from "react";
import { Grid, Image } from "semantic-ui-react";
import Iframe from "react-iframe";

const MusicFriends = () => (
  <div>
    <h1>My good and talented friends</h1>
    <h2>PLEASE, ENJOY THE MUSIC and support them in any way you can.</h2>

    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column width={4}>
          <p width="520px">Sarah Molly Biklen</p>
        </Grid.Column>
        <Grid.Column width={6}>
          <Image
            src="https://i.ibb.co/ZKpW2Qg/0023395089-10.jpg"
            width="520px"
            height="320px"
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Iframe
            url="https://bandcamp.com/EmbeddedPlayer/album=412366138/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" 
            width="320px"
            height="320px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <p width="520px">ALLGREENLIGHTS;ALLTHETIME </p>
        </Grid.Column>

        <Grid.Column width={6}>
          <Image
            src="https://i.ibb.co/Hx3c9Kq/47240911-10218399104195775-7050586238297833472-n.jpg"
            width="520px"
            height="320px"
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Iframe
            url="https://bandcamp.com/EmbeddedPlayer/album=3500519773/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" 
            width="320px"
            height="320px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <p width="520px">Arthur Watership </p>
        </Grid.Column>

        <Grid.Column width={6}>
          <Image
            src="https://i.ibb.co/0J4g6By/0009454018-21.jpg"
            width="520px"
            height="320px"
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Iframe
            url="https://bandcamp.com/EmbeddedPlayer/album=1912016469/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" 
            width="320px"
            height="320px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <p width="520px">Roving </p>
        </Grid.Column>

        <Grid.Column width={6}>
          <Image
            src="https://i.ibb.co/zr7Hkwt/0015693208-21.jpg"
            width="520px"
            height="320px"
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Iframe
            url= "https://bandcamp.com/EmbeddedPlayer/track=2402203446/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/" 
            width="320px"
            height="320px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default MusicFriends