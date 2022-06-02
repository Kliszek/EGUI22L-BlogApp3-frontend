export interface BlogEntry {
  id: string;
  title: string;
  //ownerId: string;
  dateTime: Date;
  content: string;
}

export interface Blog {
  id: string;
  title: string;
  ownerId: string;
  blogEntryList: BlogEntry[];
}
