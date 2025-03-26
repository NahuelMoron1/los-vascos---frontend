export class Subcategory {
  id: string | undefined;
  name: string;
  categoryID: string;
  constructor(id: string, name: string, categoryID: string) {
    this.id = id;
    this.name = name;
    this.categoryID = categoryID;
  }
}
