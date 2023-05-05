import urllib.request

# URL of the English word list
url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt'

# Download the word list
response = urllib.request.urlopen(url)
words = response.read().decode().splitlines()

# Write the words to a text file
with open('english_words.txt', 'w') as f:
    for word in words:
        f.write(word + '\n')