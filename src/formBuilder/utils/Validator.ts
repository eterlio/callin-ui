export class Validator {
  static required(value: string): boolean {
    return !!value.trim();
  }

  static in(value: string, data: string): boolean {
    return !!data.split(",").includes(value);
  }

  static min(value: string, data: string): boolean {
    return value.trim().length >= Number(data);
  }

  static max(value: string, data: string): boolean {
    return value.trim().length <= Number(data);
  }

  static email(value: string): boolean {
    var tester =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!value) return false;

    var emailParts = value.split("@");

    if (emailParts.length !== 2) return false;

    var account = emailParts[0];
    var address = emailParts[1];

    if (account.length > 64) return false;
    else if (address.length > 255) return false;

    var domainParts = address.split(".");

    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    return tester.test(value);
  }

  static password(value: string): boolean {
    // Add your password validation logic here
    // Example: Password should be at least 8 characters long with at least one uppercase letter, one lowercase letter, and one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(value);
  }

  static number(value: string): boolean {
    // Regular expression for number validation
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(value);
  }

  static string(value: string): boolean {
    // Add your string validation logic here
    // Example: String should not contain any special characters or numbers
    const stringRegex = /^[a-zA-Z\s]*$/;
    return stringRegex.test(value);
  }

  static eq(value: string, data: string): boolean {
    // Check if the value matches the provided data
    return value === data;
  }
  static matches(value: string, data: string): boolean {
    // Create a regular expression from the provided data
    const regex = new RegExp(data);
    return regex.test(value);
  }

  static date(value: string): boolean {
    return new Date(value) instanceof Date;
  }

  static between(value: string, data: string): boolean {
    // Add your between validation logic here
    // Example: Check if the value is between two provided values
    const [min, max] = data.split(",");
    const numericValue = Number(value);
    return numericValue >= Number(min) && numericValue <= Number(max);
  }

  static before(value: string, data: string): boolean {
    // Add your before validation logic here
    // Example: Check if the value is a date before the provided date
    return true;
  }

  static after(value: string, data: string): boolean {
    // Add your after validation logic here
    // Example: Check if the value is a date after the provided date
    return true;
  }

  static endsWith(value: string, data: string): boolean {
    // Check if the value ends with the provided data
    return value.endsWith(data);
  }

  static startsWith(value: string, data: string): boolean {
    // Check if the value starts with the provided data
    return value.startsWith(data);
  }
  static url(value: string): boolean {
    // Regular expression for URL validation
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(value);
  }
}
