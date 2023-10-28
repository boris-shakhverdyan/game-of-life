import Random from "../Random/index.js";
import { TGender } from "./types.js";

class Gender {
    public static list: TGender[] = ["Female", "Male"];

    public static random(): TGender {
        return Random.arrayItem(this.list);
    }
}

export default Gender;
