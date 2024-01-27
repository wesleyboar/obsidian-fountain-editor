export const TOKEN_NAMES = {
	sceneHeading: "scene-heading",
	formattingSceneHeading: "formatting-scene-heading",
	action: "action",
	character: "character",
	dialogue: "dialogue",
	dualDialogue: "dual-dialogue",
	fDualDialogueStart: "dual-dialogue-start",
	fDualDialogueEnd: "dual-dialogue-end",
	parenthetical: "parenthetical",
	lyrics: "lyrics",
	centered: "centered",
	transition: "transition",
	section: "section",
	synopsis: "synopsis",
	boneyard: "boneyard",
	fBoneyardStart: "formatting-boneyard-start",
	fBoneyardEnd: "formatting-boneyard-end",
	pageBreak: "page-break",
};

const n = TOKEN_NAMES;

const characterFrontReStr = "^[^\S\r\n]*(?=.*[A-Z\u00C0-\u00DEF])[A-Z0-9\u00C0-\u00DEF \t'.-]+\s?(\(.*\))?";
const characterBackReStr = "$|@.*$/";

export const LINE_TOKENS = [
	{
		id: n.sceneHeading,
		regex:
			/^((?:\*{0,3}_?)?(?:(?:int|ext|est|i\/e|int\/ext)[. ]).+)|^(?:\.(?!\.+))(.+)/i,
	},
	{
		id: n.action,
		regex: /^!.*$/,
	},
	{
		id: n.character,
		regex: new RegExp(characterFrontReStr + characterBackReStr),
	},
	{
		id: n.character,
		regex:
			/^[^\S\r\n]*(?=.*[A-Z\u00C0-\u00DEF])[A-Z0-9\u00C0-\u00DEF \t'.-]+\s?(\(.*\))?\s?(\^)?$|@.*$/,
	},
	{
		id: n.dialogue,
		regex: /^[^\S\r\n]*(\^?)?(?:\n(?!\n+))([\s\S]+)/,
	},
	// dualDialogue: …
	{
		id: n.fDualDialogueStart,
		regex: new RegExp(characterFrontReStr + characterBackReStr),
	},
	{
		id: n.fDualDialogueEnd,
		regex: new RegExp(characterFrontReStr + "\s?(\^)?" + characterBackReStr),
	},
	{
		id: n.parenthetical,
		regex: /^[^\S\r\n]*(\(.+\))$/,
	},
	{
		id: n.lyrics,
		regex: /^~.*$/,
	},
	{
		id: n.centered,
		regex: /^[^\S\r\n]*>[^<>]+<$/,
	},
	{
		id: n.transition,
		regex: /^[^\S\r\n]*(>[^<\n\r]*|[A-Z ]+ TO:)$/,
	},
	{
		id: n.section,
		regex: /^(#+)(?: *)(.*)/,
	},
	{
		id: n.synopsis,
		regex: /^(?:=(?!=+) *)(.*)$/,
	},
	// note: /^(?:\[{2}(?!\[+))(.+)(?:\]{2}(?!\[+))$/,
	// note_inline: /(?:\[{2}(?!\[+))([\s\S]+?)(?:\]{2}(?!\[+))/g,
	// boneyard: /(^\/\*|^\*\/)$/g,
	{
		id: n.fBoneyardStart,
		regex: /(^\/\*$)/g,
	},
	{
		id: n.fBoneyardEnd,
		regex: /(^\*\/$)/g,
	},
	{
		id: n.pageBreak,
		regex: /^={3,}$/,
	},
] as const;
