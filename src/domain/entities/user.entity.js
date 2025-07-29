class User {
  constructor({ id = null, role, username, email, password }) {
    this.id = id;
    this.role = role;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  isValidRole() {
    const allowedRoles = ["admin", "user"];
    return allowedRoles.includes(this.role);
  }

  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  isValidPassword() {
    return this.password && this.password.length >= 8;
  }

  isValidUsername() {
    return this.username && this.username.length >= 2;
  }

  validate({ partial = false } = {}) {
    const errors = [];

    if (!partial || this.role !== undefined) {
      if (!this.isValidRole()) errors.push("Role must be admin or user");
    }

    if (!partial || this.email !== undefined) {
      if (!this.isValidEmail()) errors.push("Invalid email format");
    }

    if (!partial || this.password !== undefined) {
      if (!this.isValidPassword()) errors.push("Password must be at least 8 characters");
    }

    if (!partial || this.username !== undefined) {
      if (!this.isValidUsername()) errors.push("Username must be at least 2 characters");
    }

    return { isValid: errors.length === 0, errors: errors };
  }

  toSafeJSON() {
    const { password, ...rest } = this;
    return rest;
  }
}

module.exports = User;
