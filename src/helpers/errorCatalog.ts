export enum ErrorTypes {
  InvalidMongoId = 'InvalidMongoId',
  NotFound = 'NotFound',
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
    message: 'Id must have 24 hexadecimal characters',
    status: 400,
  },
  NotFound: {
    message: 'Object not found',
    status: 404,
  },
};