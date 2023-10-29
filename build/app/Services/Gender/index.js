import Random from "../Random/index.js";
class Gender {
    static random() {
        return Random.arrayItem(this.list);
    }
}
Gender.list = ["Female", "Male"];
export default Gender;
//# sourceMappingURL=index.js.map