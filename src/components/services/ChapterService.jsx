import GenericService from "./GenericService";

class ChapterService extends GenericService {
  constructor() {
    super();
  }

  getChapter = () => this.get("/api/chapters");
  getSingleChapter = (id) => this.get("/api/chapters/" + id);
  addChapter = (formData, config) =>
    this.postData("/api/chapters", formData, config);
  deleteChapter = (_id) => this.delete("/api/chapters/delete/" + _id);
  updateChapter = (_id, data) => this.put("/api/chapters/update/" + _id, data);
}

let chapterService = new ChapterService();
export default chapterService;
