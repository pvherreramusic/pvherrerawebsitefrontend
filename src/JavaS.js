import React, {} from "react";
import { Grid } from "semantic-ui-react";

const JavaSc = () => {
  let EventPlan = "https://limitless-forest-30502.herokuapp.com";
  let Cheese = "https://lit-tundra-09774.herokuapp.com/";
  let LINKATOR = "https://mysterious-harbor-73124.herokuapp.com";

  return (
    <div>
      <br></br>
      <Grid columns={3}>
        <Grid.Column>
          <a href={EventPlan}>Event Planner(Sept 2020)</a>
        </Grid.Column>
        <Grid.Column>
          <a href={Cheese}>Cheese Wizards (Group Project) - July 2020</a>
        </Grid.Column>
        <Grid.Column>
          <a href={LINKATOR}>
            The Great Linkerator (Group Project) - June 2020
          </a>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default JavaSc;
