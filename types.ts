
export interface Student {
  id: string;
  name: string;
  isPresent: boolean;
  timestamp?: string; // HH:mm format
}

export interface ClassData {
  date: string; // YYYY-MM-DD format
  totalStudents: number;
  students: Student[];
}

export interface ClassSession {
  [date: string]: ClassData;
}
