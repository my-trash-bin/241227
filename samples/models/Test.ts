export interface Test {
  name: "Test";
  scalars: {
    id: string;
    id1: string;
    id_2: number;
  };
  objects: {};
  uniqueIndices: [["id"], ["id1", "id_2"]];
  nonUniqueIndices: [];
}
