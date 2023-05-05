import re

with open('english_words_upper.txt', 'r') as f_in:
    with open('english_words_upper_cleaner.txt', 'w') as f_out:
        for line in f_in:
            if re.match(r'^[a-zA-Z\s]+$', line):
                f_out.write(line)
