import { observable } from "mobx";

export class EditSiteStore {
  @observable public id: number | null = null;
  @observable public active: boolean = false;
}

export default new EditSiteStore();
