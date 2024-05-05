import { IUser } from "@/views/dashboard";

// Function to generate a random phone number
function generatePhoneNumber(): string {
  const digits = "0123456789";
  let phoneNumber = "+";
  for (let i = 0; i < 10; i++) {
    phoneNumber += digits[Math.floor(Math.random() * 10)];
  }
  return phoneNumber;
}

// Function to generate a random address
function generateAddress(): string {
  const addresses = [
    "123 Main St",
    "456 Elm St",
    "789 Oak St",
    "101 Pine St",
    "202 Maple St",
  ];
  return addresses[Math.floor(Math.random() * addresses.length)];
}

// Function to generate a hundred users
function generateUsers(): IUser[] {
  const users: IUser[] = [];
  for (let i = 1; i <= 100; i++) {
    const user: IUser = {
      id: i,
      username: `user_${i}`,
      firstName: `First_${i}`,
      middleName: `Middle_${i}`,
      lastName: `Last_${i}`,
      phoneNumber: generatePhoneNumber(),
      address: generateAddress(),
      access: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(user);
  }
  return users;
}

export const data = generateUsers();
