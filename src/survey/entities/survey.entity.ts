//실제 데이터 모델 추가 필요 typeorm at postgresql
export class Survey {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  completed: boolean;
}
