import {Tag} from "./Tag";

export class TagManager {
    private tags: Tag[];

    constructor(initialTags: Tag[]) {
        this.tags = initialTags;
    }

    addTag(tag: Tag): void {
        this.tags.push(tag);
    }

    updateTag(id: string, label: string): void {
        this.tags = this.tags.map(tag =>
            tag.id === id ? { ...tag, label } : tag
        );
    }

    deleteTag(id: string): void {
        this.tags = this.tags.filter(tag => tag.id !== id);
    }

    getTags(): Tag[] {
        return this.tags;
    }

    setTags(rawTags: Tag[])
    {
        this.tags = rawTags;
    }
}
