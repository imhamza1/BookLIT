import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import userService from "../../services/UserService";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import chapterService from "../../services/ChapterService";
import Auth from "../../auth/Auth";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
  },
  child: {
    width: "600px",
  },
}));

const UpdateChapter = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const id = props.match.params.id;

  useEffect(() => {
    toast.info("Update this chapter", {
      position: toast.POSITION.TOP_CENTER,
    });
  }, []);

  useEffect(() => {
    setLoader(true);
    chapterService
      .getSingleChapter(id)
      .then((data) => {
        console.log(data);
        setTitle(data.chapter.title);
        setContent(data.chapter.content);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("novel_id", id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    chapterService
      .updateChapter(id, formData, config)
      .then((data) => {
        console.log(data);
        setLoader(false);
        props.history.push("/chapter/" + id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Auth>
      <div className={classes.container}>
        {loader ? (
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "10%",
                  marginBottom: "20%",
                }}
              >
                <Loader
                  type="ThreeDots"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={6000} //6 secs
                />
              </Grid>
            </Grid>
          </Container>
        ) : (
          <div className={classes.child}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="title"
                fullWidth
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Give a title of your Chapter"
              />{" "}
              <br />
              <br />
              <TextField
                id="outlined-multiline-static"
                label="Content"
                required
                multiline
                rows={12}
                fullWidth
                value={content}
                variant="outlined"
                placeholder="Enter content of your chapter"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <br />
              <br />
              <input
                accept="image/*"
                name="image"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />{" "}
              <br />
              <br />
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
            </form>
          </div>
        )}
      </div>
    </Auth>
  );
};

export default withRouter(UpdateChapter);
