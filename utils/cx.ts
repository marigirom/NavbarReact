export default function cx(...args: Array<string | false | null | undefined>) {
    return args.filter(Boolean).join('');
}