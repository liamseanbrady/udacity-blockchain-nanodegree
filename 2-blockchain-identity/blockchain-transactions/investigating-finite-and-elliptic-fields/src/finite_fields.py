print """

Write a program to calculate 1*k, 2*k, 3*k, ... 30*k for some k in F31.
Notice anything about these sets?
"""
numbers = list(range(31))
k = 9
new_numbers = list(map(lambda number: (k * number) % 31, numbers))

print("Original set F31")
print(numbers)
print("")
print("Resulting set of 9 (could be any k from F31) multiplied by all members of set above (mod 31)")
print(new_numbers)
print("")
print("Same set as above but sorted numerically ascending")
print(sorted(new_numbers))
print("")

print """

************************************************

In the above we can see that because the number of elements in the set `numbers`
is a prime, `numbers` and `newNumbers` are isomorphic.

As we can see from the results below, when the number of elements in the set
is not a prime number, we don't have this guarantee. In the case below, `newNumbers`
is not isomorphic to `numbers`. The difference between the morphisms above and beloware an interesting way to visualize the general idea of Fermat's Little Theorem.
"""
numbers = list(range(30))
k = 9
new_numbers = list(map(lambda number: (k * number) % 30, numbers))

print("Original set F30 (non-prime field order)")
print(numbers)
print("")
print("Resulting set of 9 (could be any k from F30) multiplied by all members of set above (mod 30)")
print(new_numbers)
print("")
print("Same set as above but sorted numerically ascending")
print(sorted(new_numbers))

print """

************************************************

Write a program to calculate k30 for all k in F31.
Notice anything?

Below, you can see that the morphism (newNumbers) equals the set {1, 1, 1, etc}

This shows Fermat's Little Theorem in action 'Let p be any prime and k E {1, 2, ..., p-1}. Then k^p-1 is congruent to 1 (mod p).'
"""
numbers = list(range(31))
new_numbers = list(map(lambda number: (pow(number, 30)) % 31, numbers))

print("Original set F31")
print(numbers)
print("")
print("Resulting set of each k in F31 raised to the order of 30, (mod 31)")
print(new_numbers)

print """

************************************************

Find a generator (discrete log problem)

In the 'discrete log problem' a generator is a number which, when a set is formed by doing G^1, G^2, G^3, ..., G^p-1 for some
prime, P, the set is equal to the finite field Fp
"""

numbers = list(range(31))
new_numbers = list(map(lambda number: { number: set(map(lambda number_to_raise: (pow(number_to_raise, number)) % 31, numbers)) }, numbers))
new_numbers_generators = [ number_set for number_set in new_numbers if len(number_set.values()[0]) == 31 ]

print("Original set F31")
print(numbers)

print """

If a set meets the specifications for a 'generator' in the discrete log problem, then the sorted set will be printed below
"""
for number_set in new_numbers_generators:
  print({ k: list(v) for k, v in number_set.iteritems() })
  print("")

generators = [ generator.keys()[0] for generator in new_numbers_generators ]
print("The valid generators for F31 are:")
print(generators)
print("")
