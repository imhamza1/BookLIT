import React from "react";
import Carousel from "react-elastic-carousel";
import Chip from "@material-ui/core/Chip";
import { withRouter } from "react-router";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 786, itemsToShow: 4 },
  { width: 1200, itemsToShow: 6 },
];

const ItemsSlider = (props) => {
  const { items } = props;
  console.log(props);
  return (
    <div>
      <Carousel breakPoints={breakPoints}>
        {items.map((novel, index) => {
          return (
            <div
              style={{ textDecoration: "none", cursor: "pointer" }}
              key={index}
            >
              <div>
                <img
                  onClick={(e) => {
                    console.log(novel._id);
                    props.history.push("/novels/" + novel._id);
                  }}
                  height="310px"
                  className="image2"
                  src={novel.image}
                />
              </div>
              <Chip
                size="small"
                label={novel.genre}
                style={{ backgroundColor: "black", color: "white" }}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default withRouter(ItemsSlider);
