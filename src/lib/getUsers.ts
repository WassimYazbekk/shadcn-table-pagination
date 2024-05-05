import { IResponse, IUser } from "@/views/dashboard";
import { data } from "./data";

// don't think about this code it is just to emulate
// an api call but i am flexing a little bit

export async function getUsers(
  page: number,
  perPage: number,
  query: string,
): Promise<IResponse<IUser>> {
  const users = data;
  const filteredUsers = users.sort((a, b) => {
    const distanceA = levenshteinDistance(
      a.firstName.toLowerCase(),
      query.toLowerCase(),
    );
    const distanceB = levenshteinDistance(
      b.firstName.toLowerCase(),
      query.toLowerCase(),
    );
    return distanceA - distanceB;
  });
  const totalRows = filteredUsers.length;
  const start = Math.max(page - 1, 0) * perPage;
  const end = start + perPage;
  const paginatedUsers = filteredUsers.slice(start, end);

  return new Promise((resolve) => {
    resolve({
      data: paginatedUsers,
      meta: {
        total: totalRows,
        page: Math.max(page, 1),
        perPage: perPage,
        totalPages: Math.ceil(totalRows / perPage),
      },
    } as IResponse<IUser>);
  });
}

function levenshteinDistance(a: string, b: string): number {
  const distanceMatrix: number[][] = [];

  // Initialize the matrix
  for (let i = 0; i <= a.length; i++) {
    distanceMatrix[i] = [];
    distanceMatrix[i][0] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    distanceMatrix[0][j] = j;
  }

  // Calculate the Levenshtein distance
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1;
      distanceMatrix[i][j] = Math.min(
        distanceMatrix[i - 1][j] + 1, // Deletion
        distanceMatrix[i][j - 1] + 1, // Insertion
        distanceMatrix[i - 1][j - 1] + substitutionCost, // Substitution
      );
    }
  }

  // Return the Levenshtein distance
  return distanceMatrix[a.length][b.length];
}
