import { CategoryDto } from "./category-dto";

export interface TaskDto {
  id: string;
  name: string;
  date: Date;
  checked: boolean;
  category: CategoryDto;
}
