export enum ErrorTypes {
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponse = {
  message: string,
  status: number,
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponse;
};

export const errorCatalog: ErrorCatalog = {
  InvalidMongoId: {
    message: 'Invalid Mongo ID',
    status: 400,
  },
};