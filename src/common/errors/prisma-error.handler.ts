import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export default function handlePrismaError(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {
    const UNIQUE_CONSTRAINT_FAILED = 'P2002';
    const RECORD_NOT_FOUND = 'P2025';

    switch (error.code) {
      case UNIQUE_CONSTRAINT_FAILED:
        const fields: string = formatFieldFromError(error);
        throw new BadRequestException(
          `Registro duplicado: ${fields} já cadastrado(s).`,
        );

      case RECORD_NOT_FOUND:
        throw new NotFoundException('Nenhum registro encontrado.');
    }
  }
}

function formatFieldFromError(
  error: PrismaClientKnownRequestError,
): string | undefined {
  const target = error.meta?.target;

  if (Array.isArray(target)) {
    // PostgreSQL
    return target.join(', ');
  }

  if (typeof target === 'string') {
    // MySQL
    const parts = target.split('_');
    if (parts.length >= 3) {
      return parts[parts.length - 2];
    }
    return target;
  }

  return undefined;
}
