
export interface IFileTree {
    id: string;
    name: string;
    type: 'file' | 'folder';
    children?: IFileTree[];
    content?: string;
}