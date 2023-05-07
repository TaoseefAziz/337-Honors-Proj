with open('english_words_upper_cleaner.txt', 'r') as f:
    words = f.read().splitlines()

with open('dictionary.js', 'w') as f:
    f.write('const dictionary = [\n')
    for i, word in enumerate(words):
        if len(word) <= 10 and len(word) >= 3:
            if i == len(words) - 1:
                f.write(f'  "{word}"\n')
            else:
                f.write(f'  "{word}",\n')
    f.write('];\n')
