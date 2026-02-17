# Contributing to HanziMaster

Thank you for your interest in contributing to **HanziMaster**!

## 📚 OpenSpec - The Single Source of Truth

This project strictly follows the **OpenSpec** documentation standard. Before writing any code, please familiarize yourself with the specifications located in the `openspec/` directory.

### Key Documents for Contributors
*   [**00_INDEX.md**](./openspec/00_INDEX.md): The master index of all specifications.
*   [**11_DEVELOPMENT_GUIDE.md**](./openspec/11_DEVELOPMENT_GUIDE.md): Coding standards, tech stack, and git workflow.
*   [**06_TESTING_AND_QA.md**](./openspec/06_TESTING_AND_QA.md): Testing protocols and QA requirements.

## 🛠️ Development Setup

1.  **Fork and Clone**:
    ```bash
    git clone https://github.com/sutchan/HanziMaster.git
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start Dev Server**:
    ```bash
    npm run dev
    ```

## 📝 Commit Guidelines

We use **Semantic Commit Messages**:
*   `feat`: New feature
*   `fix`: Bug fix
*   `docs`: Documentation only
*   `style`: Formatting, missing semi colons, etc; no code change
*   `refactor`: Refactoring production code
*   `test`: Adding missing tests, refactoring tests
*   `chore`: Updating build tasks, package manager configs, etc

Example: `feat(canvas): implement ghosting hint mechanism`

## 📄 License

By contributing, you agree that your contributions will be licensed under its GPL-3.0 License.