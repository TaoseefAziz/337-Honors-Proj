with open('english_words.txt', 'r') as f_in:
    with open('english_words_upper.txt', 'w') as f_out:
        for line in f_in:
            f_out.write(line.upper())
