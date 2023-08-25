export default interface IMessage {
	language: "NL" | "EN" | string;
	audience: "Public" | "Driver";
	message: string;
}
