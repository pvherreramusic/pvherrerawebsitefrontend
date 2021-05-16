import React, {} from "react";
import { Grid,  } from "semantic-ui-react";






const Footer = () => {

  let Bandcamp = "https://pvherreramusic.bandcamp.com";
  let Youtube = "https://www.youtube.com/channel/UCQfdibtYzntJgnVpcrnLXQg";
  let Instagram = "https://www.instagram.com/pvherreramusic/";
  let GitHub = "https://github.com/pvherreramusic";

  return (
    <div id="footer">
      
  
      <Grid
        columns={4}
        textAlign="center"
        style={{
          
          backgroundColor: "black",
          position: "static"
          
        }}
      >
        <Grid.Column>
          <a href={Bandcamp}>Bandcamp</a>
        </Grid.Column>
        <Grid.Column>
          <a href={Youtube}>Youtube</a>
        </Grid.Column>
        <Grid.Column>
          <a href={Instagram}>Instagram</a>
        </Grid.Column>
        <Grid.Column>
          <a href={GitHub}>GitHub</a>
        </Grid.Column>
      </Grid>
  
</div>

  );
};

export default Footer;
