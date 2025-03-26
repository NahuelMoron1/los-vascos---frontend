export class Brand {
  id: string;
  name: string;
  image: string;
  temporaryFile: File | null = null;

  constructor(id: string, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}
