interface MovieFormData {
    title: string;
    year: string;
    genre: string;
  }
  
  interface ValidationErrors {
    title: string;
    year: string;
    genre: string;
  }

  interface Movie {
    id: number;
    title: string;
    year: number;
    genre: string;
  }
  