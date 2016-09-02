# README

Example of using linkparser gem:

```dict = LinkParser::Dictionary.new
=> #<LinkParser::Dictionary:0x007f9a5b117220>

sent = dict.parse( "People use Ruby for all kinds of nifty things." )
=> #<LinkParser::Sentence:0x1fe69761a146 "LEFT-WALL people.p use.v Ruby.f
    for.p all.a kinds.n of   nifty.a things.n . RIGHT-WALL"/15
    linkages/0 nulls>

sent.subject
=> "people"

sent.verb
=> "use"

sent.object
=> "Ruby.f"```

(from https://github.com/ged/linkparser)
