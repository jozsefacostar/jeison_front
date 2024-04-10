export interface TransactionDto {
  amount: number;
  code: 'i' | 'e';
  date: Date;
  financialProductDesc: string;
  concept: string;
  total: number;
  totalCC: number;
  totalCA: number;
  totalCDT: number;
}

