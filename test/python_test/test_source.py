import unittest

from .source import A


class TestA(unittest.TestCase):
    def test_mya(self):
        a = A()
        self.assertEqual(a.my_a(), 1)
